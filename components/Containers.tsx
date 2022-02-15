import styled from 'styled-components/native';

export const ScreenContainerWrapper = styled.SafeAreaView`
    flex: 1;
    background-color: #FCFCFC;
`;

interface Props {
    children: React.ReactNode;
}

export const Container = ({ children }: Props) => (
    <ScreenContainerWrapper>
        {children}
    </ScreenContainerWrapper>
)
