import { Text as DefaultText, TextProps } from './Themed';

export const Text = (props: TextProps) => (
  <DefaultText
    {...props}
    style={
      [props.style,
      {
        fontFamily: props.fontWeight === 'bold' ? 'ubuntu-bold' : 'ubuntu',
        color: props.color || 'black'
      }]}
  />
)
