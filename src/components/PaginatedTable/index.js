import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button, KIND} from 'baseui/button';
import {Plus, TriangleDown} from 'baseui/icon';
import {StatefulMenu} from 'baseui/menu';
import {Pagination} from 'baseui/pagination';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {
  StatefulDataTable,
} from 'baseui/data-table';
import {Table} from 'baseui/table';


export default function PaginatedTable({
    title,
    data,
    columns,
    actionText,
    onAction
}) {
  const [css, theme] = useStyletron();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);
  const handlePageChange = (nextPage) => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(data.length / limit)) {
      return;
    }
    setPage(nextPage);
  };
  const handleLimitChange = (nextLimit) => {
    const nextPageNum = Math.ceil(data.length / nextLimit);
    if (nextPageNum < page) {
      setLimit(nextLimit);
      setPage(nextPageNum);
    } else {
      setLimit(nextLimit);
    }
  };
  const window = () => {
    const min = (page - 1) * limit;
    return data.slice(min, min + limit);
  };
  return (
    <React.Fragment>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
        })}
      >
        <div
          className={css({
            // ...theme.typography.font750
            fontFamily: theme.typography.font750.fontFamily,
            fontWeight: theme.typography.font750.fontWeight,
            fontSize: theme.typography.font750.fontSize,
            lineHeight: theme.typography.font750.lineHeight,
          })}
        >
          {title}
        </div>
        {/* <Button size='compact' endEnhancer={() => <Plus/>} onClick={onAction}>
          <div
            className={css({
              paddingLeft: theme.sizing.scale1200,
              paddingRight: theme.sizing.scale1200,
            })}
          >
            
          </div>
        </Button> */}
        {actionText}
      </div>
      <div className={css({height: '500px'})}>
        <Table columns={columns} data={window()} />
      </div>
      <div
        className={css({
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
          paddingRight: theme.sizing.scale800,
          paddingLeft: theme.sizing.scale800,
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <StatefulPopover
          content={({close}) => (
            <StatefulMenu
              items={Array.from({length: 100}, (_, i) => ({
                label: i + 1,
              }))}
              onItemSelect={({item}) => {
                handleLimitChange(item.label);
                close();
              }}
              overrides={{
                List: {
                  style: {height: '150px', width: '100px'},
                },
              }}
            />
          )}
          placement={PLACEMENT.bottom}
        >
          <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
            {`${limit} Rows`}
          </Button>
        </StatefulPopover>
        <Pagination
          currentPage={page}
          numPages={Math.ceil(data.length / limit)}
          onPageChange={({nextPage}) => handlePageChange(nextPage)}
        />
      </div>
    </React.Fragment>
  );
}