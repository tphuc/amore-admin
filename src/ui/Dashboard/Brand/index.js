import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActDelete, ActEdit } from '../../../components/StatefulTable';
import {
  useSnackbar,
} from 'baseui/snackbar';
import useBrands, { BrandsCRUD } from '../../../framework/firebase/api/brands';




export default function Brand() {

  const { data: brands, mutate } = useBrands();
  const { enqueue } = useSnackbar()

  const onAdd = async (data) => {
    try {
      let res = await BrandsCRUD.create(data);
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
      let res = await BrandsCRUD.update(id, data);
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
      let res = await BrandsCRUD.delete(item.id);
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
      title="Nhãn hàng"
      actionText={<ActAdd
        onConfirm={onAdd}
        fields={[
          {
            id: "label",
            type: "text",
            placeholder: 'Tên nhãn hàng'
          }
        ]} kind='primary' shape='pill' />}
      data={brands || []}
      columns={['name']}
      mapRow={(item) => [
        item.label,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActEdit fields={[
            {
              id:"label",
              type: "text",
              placeholder: 'Tên nhãn hàng',
              defaultValue: item['label']
            }
          ]} onConfirm={(data) => onEdit(item.id, data)} />
        </>
      ]}
    />

  </Block>
}