import { Table, Tag } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import useRooms from 'Hooks/useRooms';
import { IRoom } from 'Interfaces/IArrangement';
import { useEffect, useState } from 'react';

interface IRow {
  key: number;
  floor: string;
  name: string;
  max: number;
  tag: string;
}

export const RoomContainer = () => {
  const [rooms] = useRooms();
  const [data, setData] = useState<IRow[]>([]);

  useEffect(() => {
    setData(
      rooms.map((room: IRoom): IRow => {
        return {
          key: room.id,
          floor: room.floor.name,
          name: room.name,
          max: room.maxUser,
          tag: '예약 가능',
        };
      }),
    );
  }, [rooms]);

  const columns = [
    {
      title: '층',
      dataIndex: 'floor',
    },
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '인원',
      dataIndex: 'max',
      sorter: {
        compare: (a: IRow, b: IRow) => a.max - b.max,
      },
    },
    {
      title: '상태',
      dataIndex: 'tag',
      sorter: {
        compare: (a: IRow, b: IRow) => parseInt(a.tag) - parseInt(b.tag),
      },
      render: (tag: string) => (
        <Tag color="green" key={tag}>
          {tag}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Header style={{ paddingLeft: 24, backgroundColor: 'transparent' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            marginBottom: '0px',
          }}
        >
          회의실 예약
        </h1>
      </Header>
      <Content style={{ margin: '24px' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          <Table
            size="middle"
            tableLayout="fixed"
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record: IRow) => {
              return {
                onClick: () => {
                  window.location.href = `/rooms/${record.key}`;
                },
              };
            }}
          />
        </div>
      </Content>
    </>
  );
};
