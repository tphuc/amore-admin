import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActDelete, ActEdit, ImagesList } from '../../../components/StatefulTable';
import {
  useSnackbar,
} from 'baseui/snackbar';
import useBrands, { BrandsCRUD } from '../../../framework/supabase/brands';
import { CloudinaryAPI } from '../../../framework/cloudinary';




export default function Brand() {

  const { data: brands, mutate } = useBrands();
  const { enqueue } = useSnackbar()

  const onAdd = async (data) => {

    try {
      let files = data.images || []
      let { images, ...fields } = data;
      let fileUrls = await CloudinaryAPI.uploadFiles(files)
      let res = await BrandsCRUD.create({
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
      let res = await BrandsCRUD.update(id, {
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
            placeholder: 'Tên hãng'
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
      data={brands || []}
      columns={['Ten', 'Hinh anh', '-']}
      mapRow={(item) => [
        item.label,
        <ImagesList images={item.images}/>,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActEdit fields={[
            {
              id:"label",
              type: "text",
              placeholder: 'Tên nhãn hàng',
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