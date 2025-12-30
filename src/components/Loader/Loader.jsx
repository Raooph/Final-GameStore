import "./Loader.css"
export const Loader=()=>{
    return (
    <div className="skeleton-grid">
  {[1, 2, 3, 4, 5, 6].map((item) => (
    <div className="skeleton-card" key={item}>
      <div className="skeleton-img"></div>

      <div className="skeleton-info">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line genre"></div>

        <div className="skeleton-footer">
          <div className="skeleton-line small"></div>
          <div className="skeleton-line price"></div>
        </div>

        <div className="skeleton-btn"></div>
      </div>
    </div>
  ))}
</div>

    )
}