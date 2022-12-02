import cn from "classnames";

export const Button = ({ disabled, children }: any) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn("text-white py-4", {
        "bg-slate-200 pointer-events-none text-slate-500": disabled,
        "bg-sky-500 hover:bg-sky-600": !disabled,
      })}
    >
      {children}
    </button>
  );
};
