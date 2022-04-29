import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vw;
`

const ConfirmationDiv = styled.div`
    width: 80vw;
    border: solid 2px red;
    padding: 3vw;
    border-radius: 15px;
    font-size: 5vw;
    text-align: center;
`



function Confirmation(){
    return(
        <Container>
            <ConfirmationDiv>

                Your order of is on your way now!

            </ConfirmationDiv>
           
        </Container>
    )
}


export default Confirmation