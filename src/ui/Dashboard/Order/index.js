import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActDelete, ActEdit, ImagesList } from '../../../components/StatefulTable';
import {
  useSnackbar,
} from 'baseui/snackbar';

import useProducts, { ProductsCRUD } from '../../../framework/firebase/api/product';

import { CloudinaryAPI } from '../../../framework/cloudinary';
import { Tag } from "baseui/tag";
import { urlToFile } from '../../../util';

export default function Order() {

  const { data: brands, mutate } = useProducts();
  const { enqueue } = useSnackbar()

  const onAdd = async (data) => {
    try {
      let files = data.images
      let fileUrls = await CloudinaryAPI.uploadFiles(files)
      let { images, ...fields } = data;
      let res = await ProductsCRUD.create({
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
      let files = data.images
      console.log(files)
      let fileUrls = await CloudinaryAPI.uploadFiles(files)

      let { images, ...fields } = data;
      let res = await ProductsCRUD.update(id, {
        images: fileUrls,
        ...fields
      });
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
      let res = await ProductsCRUD.delete(item.id);
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
      title="Sản phẩm"
      actionText={<ActAdd
        onConfirm={onAdd}
        fields={[
          {
            id: "label",
            type: "text",
            placeholder: 'Tên sản phẩm'
          },
          {
            id: "origin",
            type: "select",
            placeholder: 'xuất xứ',
            props: {
              creatable: true
            }
          },
          {
            id: "gender",
            type: "select-multiple",
            placeholder: 'giới tính',
            props: {
              creatable: true
            }
          },
          {
            id: "style",
            type: "select-multiple",
            placeholder: 'phong cách',
            props: {
              creatable: true,
              labelKey: "label",
              valueKey: "value"
            },
          },
          {
            id: "images",
            type: "file",
            placeholder: 'hình ảnh được upload',
            props: {
              creatable: true,
            },
          }
        ]} kind='primary' shape='pill' />}
      data={brands || []}
      columns={['Tên', 'Xuất xứ', 'Giới tính', 'Phong cách', 'Hình ảnh', '_']}
      mapRow={(item) => [
        item.label,
        <>{item.origin.map(item => <Tag closeable={false}>{item.label}</Tag>)}</>,
        <>{item.gender.map(item => <Tag closeable={false}>{item.label}</Tag>)}</>,
        <>{item.style.map(item => <Tag closeable={false}>{item.label}</Tag>)}</>,
        <ImagesList images={item.images} />,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActEdit fields={[
            {
              id: "label",
              type: "text",
              placeholder: 'Tên sản phẩm',
              defaultValue: item['label']
            },
            {
              id: "origin",
              type: "select",
              placeholder: 'xuất xứ',
              props: {
                creatable: true
              },
              defaultValue: item['origin']
            },
            {
              id: "gender",
              type: "select-multiple",
              placeholder: 'giới tính',
              props: {
                creatable: true
              },
              defaultValue: item['gender']
            },
            {
              id: "style",
              type: "select-multiple",
              placeholder: 'phong cách',
              props: {
                creatable: true
              },
              defaultValue: item['style']
            },
            {
              id: "images",
              type: "file",
              placeholder: 'hình ảnh được upload',
              props: {
                creatable: true,
                // labelKey: 'name',
                valueKey: 'name'
              },
              defaultValue: item.images?.map(item => ({ name: item }))
              // Promise.all(item['images'].map(async item => urlToFile(item, item)))
            }
          ]} onConfirm={(data) => onEdit(item.id, data)} />
        </>
      ]}
    />

  </Block>
}