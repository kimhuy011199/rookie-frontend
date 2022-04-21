import React, { useState } from 'react';
import { KEY_CODE } from '../../constants/enums';
import Tag from '../Tag';
import style from './style.module.css';

interface TagInputInterface {
  tags: string[];
  setTags: Function;
}

const TagInput = (props: TagInputInterface) => {
  const { tags, setTags } = props;
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleKeyDown = (e: any) => {
    switch (e.which) {
      case KEY_CODE.ENTER:
      case KEY_CODE.TAB:
        if (e.target.value) {
          e.preventDefault();
          addNewTag(e.target.value);
        }
        break;
      case KEY_CODE.BACKSPACE:
        if (!e.target.value && tags.length) {
          deleteTag(tags.length - 1);
        }
        break;
    }
  };

  const handleChange = (e: any) => {
    setCurrentTag(e.target.value);
  };

  const addNewTag = (tag: string) => {
    setCurrentTag('');
    setTags([...tags, tag]);
  };

  const deleteTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags([...newTags]);
  };

  return (
    <label htmlFor="tags" className={style.container}>
      {tags.map((tag, i) => {
        return <Tag key={i} value={tag} i={i} onDelete={deleteTag} />;
      })}
      <div className={style.tags}>
        <input
          id="tags"
          type="text"
          className={style.input}
          value={currentTag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </label>
  );
};

export default TagInput;
