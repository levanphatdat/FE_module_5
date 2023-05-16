import React, {useEffect, useState} from "react";
import {deleteProduct, findAll, findProductById} from "../service/productService";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import ReactPaginate from "react-paginate";

export function ListProduct() {
    const [listProduct, setListProduct] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [nameAndPage, setNameAndPage] = useState({
        page: 0,
        name: "",
    });
    const [bookDetail, setBookDetail] = useState();

    const handlePageClick = (event) => {
        setNameAndPage((prev) => ({...prev, page: event.selected}));
    };
    const getData = async (id) => {
        const data = await findProductById(id);
        setBookDetail(data);
    };
    const handleDeleteBook = async () => {
        await deleteProduct(bookDetail.id);
        const response = await findAll(nameAndPage);
        setListProduct(response.content);
        alert("Xoá sản phẩm thành công");
    };
    useEffect(() => {
        const list = async () => {
            const response = await findAll(nameAndPage);
            setListProduct(response.content);
            setPageCount(response.totalPages);
        };

        list();
    }, [nameAndPage]);
    return (
        <div className={'container-fluid'}>
            <h1 className={'justify-content-center d-flex'}>Danh sách sản phẩm</h1>
            <Formik
                initialValues={{
                    name: nameAndPage.name,
                }}
                onSubmit={(values) => {
                    setNameAndPage((prev) => {
                        return {...prev, ...values, page: 0};
                    });
                }}
            >
                <Form>
                    <Field name="name" type={'text'} className={'inputCss'}/>
                    <button type="submit" className="btn btn-primary mx-3">
                        Tìm kiếm
                    </button>
                </Form>
            </Formik>
            <Link to={'/create'} className={'btn btn-success'}>Thêm mới sản phẩm</Link>
            {
                listProduct.length === 0 ? <h1 className={'text-danger text-center my-3'}>Không tìm thấy kết quả</h1> :
                    <div>
                        <table className={'table table-success text-center my-3'}>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Ngày nhập</th>
                                <th>Số lượng</th>
                                <th>Loại sản phẩm</th>
                                <th>Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                listProduct.map((product, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.code}</td>
                                        <td>{product.name}</td>
                                        <td>{product.date}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            {product.productType.name}
                                        </td>
                                        <td>
                                            <Link to={`/edit/${product.id}`}
                                                  className={'btn btn-primary me-3'}>Sửa</Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => getData(product.id)}
                                            >
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className="d-grid">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageCount={pageCount}
                                previousLabel="< "
                                containerClassName="pagination"
                                pageLinkClassName="page-num"
                                nextLinkClassName="page-next"
                                previousLinkClassName="page-previous"
                                activeClassName="active"
                                disabledClassName="d-none"
                            />
                        </div>
                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Delete
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        Bạn có muốn xoá{" "}
                                        <span className={"text-danger"}>{bookDetail?.name}</span>?
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Huỷ
                                        </button>
                                        <button
                                            data-bs-dismiss="modal"
                                            type="button"
                                            onClick={() => handleDeleteBook()}
                                            className="btn btn-primary"
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}