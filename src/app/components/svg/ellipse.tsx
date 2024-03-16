type Props = {
  color: number[];
};

export default function Ellipsis({ color }: Props) {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="150" cy="150" r="150" fill={`rgb(${color[0]},${color[1]},${color[2]})`} />
    </svg>
  );
}
