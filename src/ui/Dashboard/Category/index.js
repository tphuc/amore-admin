import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActDelete, ActEdit } from '../../../components/StatefulTable';
import useCategories, { CategoriesCRUD } from '../../../framework/firebase/api/categories';
import {
  SnackbarProvider,
  useSnackbar,
  DURATION,
} from 'baseui/snackbar';




export default function Category() {

  const { data: categories, mutate } = useCategories();
  const { enqueue } = useSnackbar()

  const onAdd = async (data) => {
    try {
      let res = await CategoriesCRUD.create(data);
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
      let res = await CategoriesCRUD.update(id, data);
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
          }
        ]} kind='primary' shape='pill' />}
      data={categories || []}
      columns={['name']}
      mapRow={(item) => [
        item.label,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActEdit fields={[
            {
              id:"label",
              type: "text",
              placeholder: 'Tên danh mục',
              defaultValue: item['label']
            }
          ]} onConfirm={(data) => onEdit(item.id, data)} />
        </>
      ]}
    />

  </Block>
}