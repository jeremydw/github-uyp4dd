// Import the result from my custom plugin.
import styles from './button.lit.scss';

export default class Button {
  static styles = styles;

  render() {
    return '<button></button>';
  }
}
