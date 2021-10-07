import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActCustom, ActDelete, ActEdit, CellTag, CellWrap, ImagesList } from '../../../components/StatefulTable';
import {
  useSnackbar,
} from 'baseui/snackbar';

import useProducts, { ProductsCRUD } from '../../../framework/firebase/api/product';

import { CloudinaryAPI } from '../../../framework/cloudinary';
import { Tag } from "baseui/tag";
import { parseLabelPrice, toArray, toObject, urlToFile } from '../../../util';
import useBrands from '../../../framework/firebase/api/brands';
import useCategories from '../../../framework/firebase/api/categories';
import { serverTimestamp } from '../../../framework/firebase';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStyletron } from 'baseui';

export default function Product() {

  const [css, theme] = useStyletron()
  const { data: products, mutate } = useProducts();
  const { data: brands} = useBrands();
  const { data: categories} = useCategories();
  const { enqueue } = useSnackbar()

  const onAdd = async (data) => {
    try {

      let files = data.images
      
      let fileUrls = await CloudinaryAPI.uploadFiles(files)
      let { images, brands, categories, ...fields } = data;

      let res = await ProductsCRUD.create({
        images: fileUrls,
        ...fields,
        brands: toObject(brands),
        categories: toObject(categories),
        price: parseLabelPrice(fields.variants[0].label).price,
        timestamp: serverTimestamp()
      })

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
      console.log(58, data)
      let files = data.images
      
      let fileUrls = await CloudinaryAPI.uploadFiles(files)

      let { images, brands, categories, ...fields } = data;

      console.log(65, id, {
        images: fileUrls,
        ...fields,
        brands: toObject(brands),
        categories: toObject(categories),
       
      })
      
      let res = await ProductsCRUD.update(id, {
        images: fileUrls,
        ...fields,
        brands: toObject(brands),
        categories: toObject(categories),
       
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

  const editProductHighlight = async (id, data) => {
    console.log(data)
    try {
      let res = await ProductsCRUD.update(id, {
          hightlight: data
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
            id: "brands",
            type: "select",
            placeholder: 'thuộc hãng',
            options: brands,
            props: {
              creatable: true,
              labelKey: "label",
              valueKey: "id"
            },
          },
          {
            id: "categories",
            type: "select-multiple",
            placeholder: 'thuộc danh mục',
            options: categories,
            props: {
              creatable: true,
              labelKey: "label",
              valueKey: "id"
            },
          },
          {
            id: "variants",
            type: "select-multiple",
            placeholder: 'lựa chọn (dung tích-giá tiền)',
            props: {
              creatable: true,
              labelKey: "label",
              valueKey: "value"
            },

          },
          {
            id: "images",
            type: "file",
            multiple: true,
            placeholder: 'hình ảnh được upload',
            props: {
              creatable: true,
            },
          },
          {
            id: "introduction",
            type: "richtext",
          }
        ]} kind='primary' shape='pill' />}
      data={products || []}
      columns={['Tên', 'Xuất xứ', 'Giới tính', 'Phong cách', 'Nhãn hiệu', 'Danh mục', 'Lựa chọn',  'Hình ảnh', '_']}
      mapRow={(item) => [
        item.label,
        <CellWrap>{item.origin.map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
        <CellWrap>{item.gender.map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
        <CellWrap>{item.style.map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
        <CellWrap>{toArray(item.brands).map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
        <CellWrap>{toArray(item.categories).map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
        <CellWrap>{item.variants.map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
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
              id: "brands",
              type: "select",
              placeholder: 'thuộc hãng',
              options: brands,
              props: {
                creatable: true,
                labelKey: "label",
                valueKey: "id"
              },
              defaultValue: toArray(item['brands'])
            },
            {
              id: "categories",
              type: "select-multiple",
              placeholder: 'thuộc danh mục',
              options: categories,
              props: {
                creatable: true,
                labelKey: "label",
                valueKey: "id"
              },
              defaultValue: toArray(item['categories'])
            },
            {
              id: "variants",
              type: "select-multiple",
              placeholder: 'lựa chọn (dung tích-giá tiền)',
              props: {
                creatable: true,
                labelKey: "label",
                valueKey: "value"
              },
              defaultValue: item['variants']
  
            },
            {
              id: "images",
              type: "file",
              multiple: true,
              placeholder: 'hình ảnh được upload',
              props: {
                creatable: true,
                valueKey: 'name'
              },
              defaultValue: item.images
            },
            {
              id: "introduction",
              type: "richtext",
              defaultValue: item['introduction'] || ''
            }
          ]} onConfirm={(data) => onEdit(item.id, data)} />
          <ActCustom header='Lên trang chính' onClick={() => editProductHighlight(item.id, !item?.hightlight)} icon={<AiFillStar color={item?.hightlight ? theme.colors.accent500 : theme.colors.mono500}/>}/>
        </>
      ]}
    />

  </Block>
}