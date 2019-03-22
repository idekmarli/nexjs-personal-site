export default ({ children }) => (
  <>
    <style jsx>{`
      .Container-outer {
        max-width: 960px;
        padding: 0 10px;
        margin: 0 auto;
      }
    `}</style>
    <div className="Container-outer">{children}</div>
  </>
);
