import Trend from "./Trend";
import style from "./trendSection.module.css";

export default function TrendSection() {
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트랜드</h3>
        {/* Trend 서버에서 받아와서 돌림 */}
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  );
}
