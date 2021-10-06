import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActConfirm, ActDelete, ActEdit, ImagesList } from '../../../components/StatefulTable';
import {
  useSnackbar,
} from 'baseui/snackbar';

import useProducts, { ProductsCRUD } from '../../../framework/firebase/api/product';

import { CloudinaryAPI } from '../../../framework/cloudinary';
import { Tag } from "baseui/tag";
import { formatNumber, urlToFile } from '../../../util';
import useOrders, { OrdersCRUD } from '../../../framework/firebase/api/order';
import { Checkbox } from 'baseui/checkbox'

export default function Order() {

  const { data: orders, mutate } = useOrders();
  console.log(orders)
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
      let res = await OrdersCRUD.delete(item.id);
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
      title="Đơn đặt"
      actionText={null}
      data={orders || []}
      columns={['Thông tin người đặt',  'Phương thức', 'Ngày đặt', 'Đã thanh toán', 'Tổng', '_']}
      mapRow={(item) => [
        <div>
        <span>{item.name}</span><br/>
        <span>{item.phone}</span><br/>
        <span>{item.address}</span>
        </div>,
        
        <p>{item.paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}</p>,
        <p>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</p>,
        <Checkbox checked={item.paid}></Checkbox>,
        <p>{formatNumber(item.total)}</p>,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActConfirm header='Xác nhận đã thanh toán' onConfirm={(data) => onEdit(item.id, data)} />
        </>
      ]}
    />

  </Block>
}