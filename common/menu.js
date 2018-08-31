/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: '员工考勤',
    icon: 'profile',
    path: 'attendance',
    children: [
      {
        name: '员工考勤列表',
        path: 'list',
      },
      {
        name: '上传考勤表',
        path: 'upload',
      },
      {
        name: '导出考勤表',
        path: 'export',
      },
    ],
  },
  {
    name: '员工管理',
    icon: 'user',
    path: 'employee',
    children: [
      {
        name: '员工列表',
        path: 'list',
      },
      {
        name: '新建员工',
        path: 'new',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
