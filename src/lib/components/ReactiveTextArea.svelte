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
    })

</script>

<textarea bind:this={textarea} rows="1" bind:value oninput={onChange} {...props}>
</textarea>

<style>
    textarea {
        resize: none;
        width: 100%;
        min-height: 1rem;
        overflow: hidden;
        font-size: 1rem;
    }
</style>
