import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActDelete, ActEdit, ImagesList } from '../../../components/StatefulTable';
import useCategories, { CategoriesCRUD } from '../../../framework/firebase/api/categories';
import {
  SnackbarProvider,
  useSnackbar,
  DURATION,
} from 'baseui/snackbar';
import { CloudinaryAPI } from '../../../framework/cloudinary';




export default function Category() {

  const { data: categories, mutate } = useCategories();
  console.log('categories', categories)
  
  const { enqueue } = useSnackbar()

  const onAdd = async (data) => {

    try {
      let files = data.images || []

      let { images, ...fields } = data;
      let fileUrls = await CloudinaryAPI.uploadFiles(files)
      console.log('add cate', {
        images: fileUrls,
        ...fields
      })
      let res = await CategoriesCRUD.create({
        images: fileUrls,
        ...fields
      });
      enqueue({
        message: 'Thêm thành công!',
      })
      mutate()
      return true
    }
    catch (e) {
      console.log(e)
    }

  }

  const onEdit = async (id, data) => {
    try {
      let files = data.images || []
      let fileUrls = await CloudinaryAPI.uploadFiles(files)

      let { images, ...fields } = data;
      let res = await CategoriesCRUD.update(id, {
        images: fileUrls,
        ...fields
      });
      console.log({
        images: fileUrls,
        ...fields
      })
      enqueue({
        message: 'Sửa thành công!',
      })
      mutate()
      return true
    }
    catch (e) {
      console.log(e)
    }


  }

  const onDelete = async (item) => {
    try {
      let res = await CategoriesCRUD.delete(item.id);
      enqueue({
        message: 'Xóa thành công!',
      })
      mutate()
      return true
    }
    catch (e) {
      console.log(e)
    }
  }

  return <Block>

    <StatefulTable
      title="Danh mục"
      actionText={<ActAdd
        onConfirm={onAdd}
        fields={[
          {
            id: "label",
            type: "text",
            placeholder: 'Tên danh mục'
          },
          {
            id: "images",
            type: "file",
            placeholder: 'hình ảnh minh họa',
            props: {
              creatable: true,
              valueKey: 'name'
            },
          }
        ]} kind='primary' shape='pill' />}
      data={categories || []}
      columns={['Tên', 'Ảnh minh họa', '-']}
      mapRow={(item) => [
        item.label,
        <ImagesList images={item.images}/>,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActEdit fields={[
            {
              id:"label",
              type: "text",
              placeholder: 'Tên danh mục',
              defaultValue: item['label']
            },
            {
              id: "images",
              type: "file",
              placeholder: 'hình ảnh',
              props: {
                creatable: true,
                valueKey: 'name'
              },
              defaultValue: item.images
            }
          ]} onConfirm={(data) => onEdit(item.id, data)} />
        </>
      ]}
    />

  </Block>
}