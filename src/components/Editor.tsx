import { FC } from 'react';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { Milkdown, useEditor } from '@milkdown/react'
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord';
import { callCommand } from "@milkdown/utils";
import { commands } from '@milkdown/core';
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from "@milkdown/preset-commonmark";
import {
  insertTableCommand,
  toggleStrikethroughCommand
} from '@milkdown/preset-gfm';
import { undoCommand, redoCommand } from '@milkdown/plugin-history';
import { listener, listenerCtx } from "@milkdown/plugin-listener";

import '@milkdown/theme-nord/style.css';

// Playground Editor
// https://milkdown.dev/playground
// https://github.com/Milkdown/website/blob/main/src/components/playground-editor/index.tsx
// this example forked from https://github.com/Milkdown/examples/tree/main/next-commonmark

const TEMPLATE = "## Synopsis\n*State what the proposal does in one sentence.*\n\n## Motivation\n*What problem does this solve? Why now?*\n\n## Specification\n*How exactly will this be executed? Be specific and leave no ambiguity.*\n\n## Rationale\n*Why is this specification appropriate?*\n\n## Risks\n*What might go wrong?*\n\n## Timeline\n*When exactly should this proposal take effect? When exactly should this proposal end?*";

const Button: FC<{ icon: string; onClick?: () => void }> = ({
  icon,
  onClick,
}) => {
  return (
    <div
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded"
      onMouseDown={(e) => {
        onClick?.();
        e.preventDefault();
      }}
    >
      <span className="material-symbols-outlined !text-base">{icon}</span>
    </div>
  );
};

const Toolbar = ({ editor } : { editor: Editor | undefined }) => {
  return (
    <div className="relative h-full pt-10">
      <div className="absolute top-0 h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
        <Button icon="table" onClick={() => editor?.action(callCommand(insertTableCommand.key))} />
      </div>
    </div>
  )
}

export const MilkdownEditor = () => {
  const editor = useEditor((root) => {
    return Editor
      .make()
      .config(ctx => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, TEMPLATE)
        const listener = ctx.get(listenerCtx);
        listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
          console.log(markdown);
        })
      })
      .config(nord)
      .use(commonmark)
      .use(gfm)
      .use(listener);
  }, []).get();

  return (
    <>
      {/* <Toolbar editor={editor}/> */}
      <Milkdown />
    </>
  )
}
