<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        value: string;
        onchange: () => void;
        [key: string]: any;
    }
    let { value = $bindable(), onchange, ...props }: Props = $props();

    let textarea: HTMLTextAreaElement;

    function onChange() {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        onchange();
    }
    onMount(() => {
        onChange();
    });
</script>

<textarea
    bind:this={textarea}
    rows="1"
    bind:value
    oninput={onChange}
    {...props}
    class="{props.class ||
        ''} resize-none w-full min-h-4 overflow-hidden text-[1rem]"
>
</textarea>
