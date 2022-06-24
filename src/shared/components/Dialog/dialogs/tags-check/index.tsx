import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TAGS_ITEMS_SIZE } from '../../../../constants/constants';
import { Tag } from '../../../../constants/types/Tag';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface TagsCheckDialogInterface {
  currentTags: Tag[];
  setTags: Function;
  close?: Function;
}

const TagsCheckDialog = (props: TagsCheckDialogInterface) => {
  const { currentTags, setTags, close } = props;
  const [searchValue, setSearchValue] = useState('');
  const [filterTags, setFilterTags] = useState(currentTags);
  const [tagsOnDialog, setTagsOnDialog] = useState(currentTags);
  const { t } = useTranslation();
  const { tags: allTags } = useSelector((state: any) => state.tags);

  const isTagIncluded = (chosenTag: Tag) => {
    return tagsOnDialog.findIndex((tag) => tag._id === chosenTag._id) !== -1;
  };

  const handleChooseTag = (chosenTag: Tag) => {
    if (isTagIncluded(chosenTag)) {
      setTags((prev: Tag[]) =>
        prev.filter((item) => item._id !== chosenTag._id)
      );
      setTagsOnDialog((prev: Tag[]) =>
        prev.filter((item) => item._id !== chosenTag._id)
      );
    } else {
      if (tagsOnDialog.length > TAGS_ITEMS_SIZE) {
        return;
      }
      setTags((prev: Tag[]) => [...prev, chosenTag]);
      setTagsOnDialog((prev: Tag[]) => [...prev, chosenTag]);
    }
  };

  const handleChangeValue = (event: any) => {
    const value = event.target.value;
    const searchTags = allTags.filter((item: Tag) => item.name.includes(value));
    setSearchValue(value);
    setFilterTags(searchTags);
  };

  return (
    <Dialog close={close}>
      <h3 className={style.heading}>{t('dialog.tag')}</h3>
      <input
        className={style.input}
        type="text"
        placeholder={t('dialog.search_tag')}
        value={searchValue}
        onChange={handleChangeValue}
      />
      <div>
        {filterTags.length > 0 &&
          filterTags.map((tag: Tag) => (
            <button
              className={`${style.button} ${
                isTagIncluded(tag) && style.active
              }`}
              key={tag._id}
              onClick={() => handleChooseTag(tag)}
            >
              {tag.name}
            </button>
          ))}
      </div>
    </Dialog>
  );
};

export default TagsCheckDialog;
