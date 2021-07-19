import React from 'react';
import moment from "moment";
import { Popconfirm, Table } from "antd";

const DashboardTable = (props) => {

    const column = [
        {
            title: "S.NO",
            dataIndex: "pdf_id",
            key: "pdf_id",
        },
        {
            title: "File Name",
            dataIndex: "fileName",
            key: "fileName",
            render: (record) => (
                <span>{record?.replace(".pdf", "")} </span>
            ),
        },
        {
            title: "Created On",
            dataIndex: "createdAt",
            key: "createdOn",
            render: (text) => (
                <span>{moment(new Date(text)).format("DD/MM/YYYY")} </span>
            ),
        },

        {
            title: "Action",
            render: (data) => {
                return (
                    <>
                        <span
                        onClick={()=>props.history.push(`/download/${data.pdf_id}`)}
                            className="linkylink"
                        >
                            View
                        </span>
                        <Popconfirm
                            title="Are you Sure ? "
                            // visible={visible}
                            onConfirm={() => props.handleDeletePdf(data.pdf_id)}
                        // okButtonProps={{ loading: confirmLoading }}
                        // onCancel={handleCancel}
                        >
                            <span
                                className="linkylink"
                            >
                                delete
                            </span>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Table
                style={{ cursor: "pointer"}}
                dataSource={props.data}
                loading={props.spinning}
                pagination={props.pagination}
                rowKey={(record) => record.pdf_id}
                columns={column}
            />
        </>
    )
}

export default DashboardTable;
