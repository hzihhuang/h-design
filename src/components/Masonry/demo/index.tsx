import React from 'react'
import { Masonry, SimpleImg } from 'HDesign';

/** 模拟图片数据 */
export const getData = (length: number) => {
  const resData = Array.from({ length }).map((_i, index) => {
    // 生成一个0到1之间的随机数
    const width = Math.floor(Math.random() * 300 + 300)
    const height = Math.floor(Math.random() * 300 + 300)
    return {
      id: length + index,
      url: `https://picsum.photos/${width}/${height}`,
      ratio: width / height,
    };
  });
  return resData;
};

const index = ({ }) => {
  return (
    <Masonry
      className='w-full'
      options={{
        gap: 16,
        itemMinWidth: 160,
      }}
    >
      {getData(40).map(item => (
        <SimpleImg
          wrapStyle={{
            width: '100%',
            aspectRatio: `${item.ratio}`,
          }}
          src={item.url}
          key={item.id}
        />
      ))}
    </Masonry>
  )
}
export default index