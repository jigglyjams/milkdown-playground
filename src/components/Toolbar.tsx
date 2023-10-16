import { FC } from "react";
import { callCommand } from "@milkdown/utils";
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
import { redoCommand, undoCommand } from "@milkdown/plugin-history";

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

export const Toolbar = () => {
  return (
    <div className="relative h-full pt-10">
      <div className="absolute top-0 h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
        <div className="prose mx-auto flex">
          <Button icon="undo" onClick={() => callCommand(undoCommand.key)} />
          <Button icon="redo" onClick={() => callCommand(redoCommand.key)} />
          <Button
            icon="format_bold"
            onClick={() => callCommand(toggleStrongCommand.key)}
          />
          <Button
            icon="format_italic"
            onClick={() => callCommand(toggleEmphasisCommand.key)}
          />
          <Button
            icon="format_strikethrough"
            onClick={() => callCommand(toggleStrikethroughCommand.key)}
          />
          <Button icon="table" onClick={() => callCommand(insertTableCommand.key)} />
          <Button
            icon="format_list_bulleted"
            onClick={() => callCommand(wrapInBulletListCommand.key)}
          />
          <Button
            icon="format_list_numbered"
            onClick={() => callCommand(wrapInOrderedListCommand.key)}
          />
          <Button
            icon="format_quote"
            onClick={() => callCommand(wrapInBlockquoteCommand.key)}
          />
        </div>
      </div>
    </div>
  )
}