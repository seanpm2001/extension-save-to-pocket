import React from 'react'
import { css, cx } from 'linaria'
import { PocketLogo } from 'components/icons'

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  background-color: #E8F7F6;
  border-radius: 30px;
  padding: 15px 20px;

  svg {
    height: 25px;
    width: 25px;
    margin-right: 14px;
  }

  .saveBlock {
    display: inline-block;
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 600;
  }

  button {
    display: inline-block;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    color: #1A1A1A;
    padding: 0;

    &:hover {
      text-decoration: underline;
      background: transparent;
    }
  }
`

export const Heading = ({ saveStatus, removeAction }) => {
  const saveStatusCopy = {
    idle: false,
    saving: 'Saving...',
    saved: 'Saved to Pocket',
    save_failed: 'Something went wrong!',
    removing: 'Removing...',
    removed: 'Removed',
    remove_failed: 'Something went wrong!',
    tags_saving: 'Saving tags...',
    tags_saved: 'Tags saved',
    tags_failed: 'Something went wrong!',
    tags_error: 'Tags limited to 25 characters'
  }

  return (
    <header className={headingStyle}>
      <div>
        <PocketLogo />
        <div className="saveBlock">{saveStatusCopy[saveStatus]}</div>
      </div>
      <button onClick={removeAction}>Remove</button>
    </header>
  )
}
