import { Component } from "react";
import api from "./api";

export default class BaseAPIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      url: null,
      data: props.initialData || null
    };
  }

  get = (url = this.state.url) => {
    if (this.state.url == null || this.state.loading) return;
    api.get(url).then(response => {
      let data = response.data;
      if (this.convertData) {
        data = this.convertData(data);
      }
      this.setState({ data: data, loading: false });
    });
  };

  componentDidMount = () => {
    this.get(this.state.url);
    if (this.state.refresh === true) {
      this.timer = setInterval(() => this.get(this.state.url), 5000);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  render() {
    if (this.state.data == null) return null;
    return this.apiRender();
  }
}
