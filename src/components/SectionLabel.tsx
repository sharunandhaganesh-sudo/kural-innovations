interface Props {
  children: React.ReactNode;
  align?: "left" | "center";
}
export default function SectionLabel({ children, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "flex justify-center" : ""}>
      <span className="section-label">
        <span className="dot" />
        <span className="line" />
        <span className="label-text">{children}</span>
        <span className="line" style={{ transform: "scaleX(-1)" }} />
      </span>
    </div>
  );
}
