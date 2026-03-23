<script lang="ts">
    interface Props {
        onclick: () => void;
        variant?: "primary" | "secondary" | "danger";
        children?: any;
        disabled?: boolean;
        title?: string;
    }

    let {
        onclick,
        variant = "primary",
        children,
        disabled = false,
        title = "",
    }: Props = $props();
</script>

<button
    {onclick}
    {disabled}
    {title}
    class="px-3.5 py-1.5 rounded-md shadow-lg cursor-pointer text-[0.85rem] font-semibold transition-all duration-200 whitespace-nowrap hover:-translate-y-px
    {variant === 'primary'
        ? 'bg-primary hover:bg-primary/90 text-text'
        : variant === 'secondary'
          ? 'bg-bg-light-1 hover:bg-bg-light-1/90 text-text border border-border-light'
          : 'bg-danger hover:bg-danger/90 text-text'}"
>
    {@render children()}
</button>
