import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        overflow-x: hidden;
        font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
        background: rgb(2,0,36);
        background: linear-gradient(210deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%) no-repeat center center fixed;
        background-size: cover;
        color: #333;
        font-size: 1rem;
        line-height: 1.5;
    }

    a {
        color: #384ebf;
        text-decoration: none;
    }
`

export const Container = styled.div`
  max-width: 920px;
  padding-right: 1rem;
  padding-left: 1rem;
  margin: auto;
  background: ${(props) => (props.whiteBg ? '#fff' : 'none')};
  border-radius: 10px;
`

export const Button = styled.button`
  border: none;
  border-radius: 10px;
  background: ${(props) => (props.primary ? '#4c7cf0' : '#9b9fa4')};
  color: #fff;
  text-align: center;
  padding: 0.5rem 1rem;
  margin: 1rem;
  cursor: pointer;
  transition: 0.2s all ease-out;
  min-width: 80px;

  &:hover {
    background: ${(props) => (props.primary ? '#38a6e8' : '#afb5bd')};
  }
`

export const Input = styled.input`
  border: solid 1px #eee;
  background: #fff;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.5rem;
  color: #555;
  font-size: 1.1rem;
  max-width: 230px;
`

export const Card = styled.div`
  border-radius: 10px;
  text-align: center;
  padding: 1rem;
  margin: 1rem auto;
  background: #fff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  max-width: 600px;
`

export const List = styled.ul`
  margin: 1rem auto;
  padding: 1rem;
`

export const ListItem = styled.li`
  font-size: 1.2rem;
  margin: 1rem;
  list-style: none;

  & a {
    display: inline-block;
    padding: 1rem;
    border-bottom: solid 4px #fafafa;
  }

  & a:hover {
    background: #fafafa;
    border-bottom: solid 4px #ffa501;
  }
`
export const Table = styled.table`
  font-size: 1.3rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  & tbody {
    text-align: center;
    & a {
      margin-top: 1rem;
      padding: 1rem;
      display: inline-block;
      border-bottom: solid 4px purple;
      &:hover {
        background: #fafafa;
      }
    }
  }
`

export const TableCentered = styled(Table)`
  margin: auto;
`

export const PageHeader = styled.header`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  background-color: ${(props) => (props.whiteBg ? '#fff' : 'none')};
  color: ${(props) => (props.whiteBg ? '#333' : '#fff')};
`

export const PageTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-align: center;
`

export const Section = styled.section`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 1.3rem;
  border-bottom: 4px solid #ffa501;
`

export const SectionTitle = styled.h2`
  font-size: ${(props) => (props.big ? '2.3rem' : '1.8rem')};
  letter-spacing: 1.1px;
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
`
