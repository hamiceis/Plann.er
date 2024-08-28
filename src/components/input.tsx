import { ComponentProps } from "react";
import { LucideIcon } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";


const containerVariants = tv({
  base: 'flex items-center gap-2',
  variants: {
    containerSize: {
      sm: "",
      default: "flex-1"
    }
  },
  defaultVariants: {
    containerSize: 'default'
  }
})

const inputVariants = tv({
  base: "text-lg outline-none bg-transparent placeholder-zinc-400",

  variants: {
    variant: {
      primary: "flex-1",
      secondary: ""
    },
    inputSize: {
      default: "flex-1",
      sm: "w-40",
    },
  },
  defaultVariants: {
    variant: "primary",
    inputSize: "default",
  },
});

interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof containerVariants> {
  icon?: LucideIcon;
}

export function Input({ icon: Icon, variant, inputSize, containerSize,  ...rest }: InputProps) {
  return (
    <div className={containerVariants({ containerSize })}>
      {Icon && <Icon className="size-5 text-zinc-400" />}
      <input {...rest} className={inputVariants({ variant, inputSize })} />
    </div>
  );
}
