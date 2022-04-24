import { render, screen } from '@testing-library/react';
import App from './App';
import store from 'config'
import theme from 'assets/theme';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import TableGenerator from 'component/table';


test('renders title link Name from Header', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>);
  const title = screen.getByText((_content, node: any) => /^Ajaib User Listing$/i.test(node.textContent));
  expect(title).toBeInTheDocument();
});

test('test MyComponent', () => {
  render(<TableGenerator
    fieldcColumn={[]}
    loading={false}
    defaultSort={"any"}
    rowData={[]}
    callSorted={() => console.log("hallo")} />);
  const element = screen.getByTestId('render-allTable')
  console.log(element);
});