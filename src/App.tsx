import TableGenerator from "component/table";
import { requestUserListing, requestUserAction } from "config/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Search from '@mui/icons-material/Search';
import { debounce } from "helper";
import HeaderBar from "component/header";

const App = () => {
  const defaultSize: number = 10
  const defaultRows: number = 100

  const [previllageData, setPrevillageData] = useState({
    sort: "username",
    page: 1,
    search: "",
    filter: "",
    data: []
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestUserListing({ isParams: { results: defaultRows, gender: "*" } }))
  }, [dispatch])
  const isRow = useSelector((state: any) => ({ ...state.userList }))

  const totalPagesPagination = Math.round(isRow.results.length / defaultSize) === 0 ? 1 : Math.round(isRow.results.length / defaultSize);
  const prevUpdatesCycles = JSON.stringify(isRow.results)

  useEffect(() => {
    let arr: any = []
    for (let i = 0; i < defaultSize; i++) {
      if (isRow.results[i]) {
        arr.push(isRow.results[i])
      }
    }
    setPrevillageData(prev => ({
      ...prev,
      data: arr,
    }))
  }, [prevUpdatesCycles, isRow.results])

  const handleFilter = ({ filtered }: { filtered: string }) => {
    setPrevillageData(prev => ({
      ...prev,
      page: 1,
      filter: filtered
    }))
    dispatch(requestUserListing({ isParams: { results: defaultRows, gender: filtered } }))
  }

  const handleSort = ({ Sorted, isType }: { Sorted: string, isType: string }) => {
    let name = Sorted;
    let arr: any = []
    if (Sorted === name) {
      arr = []
      if (isType === "asc") {
        arr = isRow.results.sort((a: any, b: any) => (a[Sorted] > b[Sorted]) ? 1 : -1);
      }
      else {
        arr = isRow.results.sort((a: any, b: any) => (b[Sorted] > a[Sorted]) ? 1 : -1);
      }
    }
    setPrevillageData(prev => ({
      ...prev,
      page: 1,
    }))
    dispatch(requestUserAction({ data: arr }))
  }
  const handlePagination = (event: any, page: number) => {
    let arr: any = []
    for (let i: number = 0; i < defaultSize; i++) {
      arr.push(isRow.results[(((page - 1) * defaultSize) + i + 1) - 1])
    }
    setPrevillageData(prev => ({
      ...prev,
      page,
      data: arr
    }))
  }

  const handleSearch = ({ keyword }: { keyword: string }) => {
    const value = isRow.results.filter((item: any) => item.username === keyword.trim() || item.email === keyword.trim());
    if (keyword === "") {
      dispatch(requestUserListing({ isParams: { results: defaultRows, gender: "*" } }))
      setPrevillageData((prev: any) => ({
        ...prev,
        page: 1,
      }))
    }
    else {
      dispatch(requestUserAction({ data: value }))
      setPrevillageData((prev: any) => ({
        ...prev,
        page: 1,
      }))
    }
  }
  const handleResetFilter = () => {
    setPrevillageData((prev: any) => ({
      ...prev,
      sort: "username",
      page: 1,
      search: "",
      filter: "",
      data: []
    }))
    dispatch(requestUserListing({ isParams: { results: defaultRows, gender: "*" } }))
  }
  const debouncedHandler = debounce(handleSearch, 1000);
  return (
    <>
      <HeaderBar />
      <div className="centered-container">
        <Box
          display="flex"
          sx={{
            width: 800,
            maxWidth: '100%',
            paddingBottom: 2
          }}
        >
          <TextField
            onChange={(e) => {
              debouncedHandler({ keyword: e.target.value })
              setPrevillageData((prev: any) => ({
                ...prev,
                search: e.target.value
              }))
            }}
            size="medium"
            fullWidth
            label="Search name or email"
            id="fullWidth"
            autoComplete="off"
            InputProps={{ endAdornment: <Search /> }}
            value={previllageData.search}
          />
          <FormControl fullWidth sx={{ marginLeft: 2 }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={previllageData.filter}
              label="Gender"
              onChange={(event: SelectChangeEvent) => handleFilter({ filtered: event.target.value as string })}
            >
              {
                isRow.options.map((item: { value: string, label: string }, idx: number) => (
                  <MenuItem key={idx} value={item.value}>{item.label}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Button onClick={handleResetFilter} fullWidth sx={{ marginLeft: 2 }} type="button" variant="contained" color="info">Reset</Button>
        </Box>
        <TableGenerator
          defaultSize={defaultSize}
          page={previllageData.page}
          defaultSort={previllageData.sort}
          loading={isRow.loading}
          fieldcColumn={[{
            fieldName: "Username",
            rowName: "username",
            align: "left"
          }, {
            fieldName: "Name",
            rowName: "name",
            align: "left"
          }, {
            fieldName: "Email",
            rowName: "email",
            align: "left"
          }, {
            fieldName: "Gender",
            rowName: "gender",
            align: "left"
          }, {
            fieldName: "Registered Date",
            rowName: "registered",
            align: "left"
          }]}
          rowData={previllageData.data}
          callSorted={handleSort}
        />
        <Stack display={"flex"} alignItems="flex-end" spacing={2} sx={{ marginTop: 2 }}>
          <Pagination
            page={previllageData.page}
            onChange={(event, page) => handlePagination(event, page)}
            count={totalPagesPagination} variant="outlined" color="secondary" shape="rounded" />
        </Stack>
      </div>
    </>
  );
}


export default App;
