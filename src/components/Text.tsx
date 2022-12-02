interface TextProps {
  children: string;
}

export const Text = ({ children }: TextProps) => {
  return <div className="py-2">{children}</div>;
};
