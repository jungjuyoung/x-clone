"use client";

import { FormEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import style from "./postForm.module.css";
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '@/model/Post';
import { Session } from 'next-auth';

type Props={
  me: Session | null
}
export default function PostForm({me}: Props) {
  const [preview, setPreview] = useState<Array<{dataUrl:string , file: File} | null>>([])
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('content', content)
      preview.forEach(p => {
        p && formData.append('images', p.file)
      })
      console.log('[PostForm] formData: ', formData)
      return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,{
        method:'post',
        credentials:'include',
        body:formData,
      })
    },
    async onSuccess(data, variables){
      const newPost = await data.json()
      setContent('')
      setPreview([])
      queryClient.getQueryData(['posts', 'recommends']) && queryClient.setQueryData(['posts', 'recommends'], (prevData: { pages: Post[][] }) => {
        const shallow = {
          ...prevData,
          pages: [...prevData.pages],
        };
        shallow.pages[0] = [...shallow.pages[0]];
        shallow.pages[0].unshift(newPost);
        return shallow;
      });
      queryClient.getQueryData(['posts', 'followings']) && queryClient.setQueryData(['posts', 'followings'], (prevData: { pages: Post[][] }) => {
        const shallow = {
          ...prevData,
          pages: [...prevData.pages],
        };
        shallow.pages[0] = [...shallow.pages[0]];
        shallow.pages[0].unshift(newPost);
        return shallow;
      })
    },
    onError(err){
      console.error(err)
      alert('업로드 중 에러가 발생했습니다.')
    }
  })

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };
  
  const onClickButton = () => {
    imageRef.current?.click();
  };

  
  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      prev[index] = null;
      return prev;
    })
  };
  
  const onUpload:ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    // console.log('[PostForm] onUpload e.target.files: ',e.target.files)
    e.target.files && Array.from(e.target.files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prevPreview) => {
          const prev = [...prevPreview];
          prev[index]={
            dataUrl: reader.result as string,
            file
          }
          return prev
        })
      }
      reader.readAsDataURL(file)

    })
  }

  return (
    <form className={style.postForm} onSubmit={mutate}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <Image src={me?.user?.image as string} alt={me?.user?.email as string} width={40} height={40}/>
        </div>
      </div>
      <div className={style.postInputSection}>
        <TextareaAutosize
          value={content}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <div className={style.preview}>
          {preview.map((v, i) => (
            v && <div key={i} onClick={onRemoveImage(i)}><Image src={v.dataUrl} alt='preview' width={100} height={100} objectFit={'contain'}/></div>
          ))}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
                onChange={onUpload}
              />
              <button
                className={style.uploadButton}
                type="button"
                onClick={onClickButton}
              >
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
