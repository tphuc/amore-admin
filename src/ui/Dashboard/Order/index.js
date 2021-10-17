import { Block } from 'baseui/block';
import React, { useState } from 'react';
import StatefulTable, { ActAdd, ActConfirm, ActDelete, ActEdit, ImagesList } from '../../../components/StatefulTable';
import {
  useSnackbar,
} from 'baseui/snackbar';

import useProducts, { ProductsCRUD } from '../../../framework/firebase/api/product';

import { CloudinaryAPI } from '../../../framework/cloudinary';
import { Tag } from "baseui/tag";
import { formatNumber, urlToFile } from '../../../util';
import useOrders, { OrderCRUD } from '../../../framework/supabase/order';
import { Checkbox } from 'baseui/checkbox'
import SearchBar from '../../../components/SearchBar';

export default function Order() {

  const [filter, setFilter] = useState({});
  const { data: orders, mutate } = useOrders(filter);
  console.log(orders)
  const { enqueue } = useSnackbar()



  const onEdit = async (id, data) => {
    try {
      let res = await OrderCRUD.update(id, data)
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
      let res = await OrderCRUD.delete(item.id);
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

    <SearchBar
      onSearch={async (data) => {

        setFilter(data)
        // mutate(res, false)

      }}
      fields={[
        {
          id: "name",
          type: "text",
          placeholder: "Tên",
          defaultValue: ''
        },
        {
          id: "phone",
          type: "text",
          placeholder: "SDT",
          defaultValue: ''
        },
        {
          id: "paid",
          type: "select",
          placeholder: "Thanh toán",
          options: [{
            label: "Đã thanh toán",
            value: true,
          },
          {
            label: "Chưa thanh toán",
            value: false
          }],
          defaultValue: '',
          props: {
            labelKey:"label",
            valueKey:"value"
          }
        },
        {
          id: "paymentMethod",
          type: "select",
          placeholder: "Phương thức thanh toán",
          options: [{
            label: "chuyển khoản",
            value: 'transfer',
          },
          {
            label: "tiền mặt",
            value: 'cash'
          }],
          defaultValue: '',
          props: {
            labelKey:"label",
            valueKey:"value"
          }
        }


      ]} />
    <StatefulTable
      title="Đơn đặt"
      actionText={null}
      data={orders || []}
      columns={['Thông tin người đặt', 'Phương thức', 'Ngày đặt', 'Đơn hàng', 'Đã thanh toán', 'Tổng', '_']}
      mapRow={(item) => [
        <div>
          <span>Tên: {item.name}</span><br />
          <span>SĐT: {item.phone}</span><br />
          <span>Địa chỉ: {item.address}</span>
        </div>,

        <p>{item.paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}</p>,
        <p>{new Date(item.created_at).toLocaleString()}</p>,
        <div>
          {item.cart?.map(item => <div style={{ display: "flex", flexDirection: "row" }}>
            <img alt='-' src={item?.images[0]?.url} style={{ width: 30, height: 30 }} />
            <div>{item.label} {item.variant.label}</div>
          </div>)}
        </div>,
        <Checkbox  checked={item.paid}></Checkbox>,

        <p>{formatNumber(item.total)}</p>,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActConfirm header='Xác nhận đã thanh toán' onConfirm={(data) => onEdit(item.id, {paid: true})} />
        </>
      ]}
    />

  </Block>
}