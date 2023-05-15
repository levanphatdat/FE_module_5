import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {editProduct, findAllType, findProductById} from "../service/productService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import moment from "moment";
import *as Yup from 'yup';

export function EditProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const [productTypes, setProductType] = useState([]);
    const [productData, setProductData] = useState();
    useEffect(() => {
        const listType = async () => {
            setProductType(await findAllType());
        }
        listType();
    }, [])
    useEffect(() => {
        const data = async () => {
            setProductData(await findProductById(params.id))
        }
        data()
    }, [params.id])
    if (!productData) {
        return null
    }
    return (
        <div className={'row'}>
            <div className={'col-3'}/>
            <div className={'col-6'}>
                <h1 className={'justify-content-center d-flex'}>Cập nhật thông tin sản phẩm</h1>
                <Formik
                    initialValues={{
                        id: productData?.id,
                        code: productData?.code,
                        name: productData?.name,
                        date: moment(productData?.date).format("YYYY-MM-DD"),
                        quantity: productData?.quantity,
                        productType: productData?.productType.id
                    }}
                    validationSchema={Yup.object({
                        code: Yup.string().required("Không được để trống trường này."),
                        name: Yup.string().required("Không được để trống trường này.").max(100, 'Tên sản phẩm không dài quá 100 kí tự'),
                        quantity: Yup.number().integer('Số lượng sản phẩm phải là số nguyên lớn hơn 0').min(1, 'Số lượng sản phẩm phải là số nguyên lớn hơn 0').required("Không được để trống trường này.")
                    })}
                    onSubmit={product => {
                        const edit = async () => {
                            const validateDate = moment(product.date).format("DD/MM/YYYY")
                            await editProduct({
                                ...product,
                                date: validateDate,
                                productType: {id: +product.productType}
                            })
                            alert('Cập nhật thông tin sản phẩm thành công !!!')
                            navigate('/')
                        }
                        edit()
                    }}
                >
                    <Form>
                        <div>Mã sản phẩm</div>
                        <Field type={'text'} name={"code"} className={'form-control'}/>
                        <ErrorMessage name={'code'} component={'span'} className={'text-danger'}/>
                        <div>Tên sản phẩm</div>
                        <Field type={'text'} name={'name'} className={'form-control'}/>
                        <ErrorMessage name={'name'} component={'span'} className={'text-danger'}/>
                        <div>Ngày nhập</div>
                        <Field type={'date'} name={"date"} className={'form-control'}/>
                        <div>Số lượng</div>
                        <Field type={'number'} name={'quantity'} className={'form-control'}/>
                        <ErrorMessage name={'quantity'} component={'span'} className={'text-danger'}/>

                        <div>Loại sản phẩm</div>
                        <Field
                            as={'select'}
                            name={'productType'}
                            className={'selectCss'}
                        >
                            {
                                productTypes.map((productType, index) => (
                                    <option key={index} value={productType.id}>{productType.name}</option>
                                ))
                            }
                        </Field>
                        <br/>
                        <Link to={'/'} className={'btn btn-secondary float-end mx-3'}>Trở lại</Link>
                        <button type={'submit'} className={'btn btn-primary float-end'}>Cập nhật</button>

                    </Form>
                </Formik>
            </div>
            <div className={'col-3'}/>
        </div>
    )
}