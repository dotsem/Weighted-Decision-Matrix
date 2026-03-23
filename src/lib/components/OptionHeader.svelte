<script lang="ts">
    import type { Option } from "$lib/types";
    import Button from "./Button.svelte";
    import ReactiveTextArea from "./ReactiveTextArea.svelte";

    interface Props {
        option: Option;
        canDelete: boolean;
        onChange: () => void;
        onRemove: (id: string) => void;
    }

    let { option, canDelete, onChange, onRemove }: Props = $props();
</script>

<th
    class="min-w-[140px] max-md:min-w-[100px] h-full p-1.5 align-middle border border-[#3D3D3D] bg-bg-light-1"
>
    <div class="flex items-center gap-1.5 justify-center relative">
        <ReactiveTextArea
            bind:value={option.name}
            onchange={onChange}
            class="w-full px-1.5 py-1 text-[0.9rem] font-semibold text-text bg-[#292929] border border-[#3D3D3D] rounded hover:border-primary focus:outline-none focus:border-primary text-center"
            placeholder="Option"
        ></ReactiveTextArea>

        <Button
            variant="danger"
            onclick={() => onRemove(option.id)}
            disabled={!canDelete}
            title="Remove option"
        >
            x
        </Button>
    </div>
</th>
