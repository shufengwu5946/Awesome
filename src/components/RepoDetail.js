import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { scaleSize } from "../utils/ScreenUtil";
import { fetchGet } from "../fetch";
import { README_URL } from "../constants/fetch";
import base64 from "base-64";
// import Markdown from "react-native-markdown-renderer";
import Markdown from 'react-native-easy-markdown';

export default class RepoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { readme: "" };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const author = navigation.getParam("author", "");
    fetchGet(
      README_URL(title, author),
      "",
      "",
      {},
      data => {
        this.setState({ readme: base64.decode("IyBjcmFjbyBbIVtCdWlsZCBTdGF0dXNdKGh0dHBzOi8vdHJhdmlzLWNpLm9y\nZy9zaGFyZWdhdGUvY3JhY28uc3ZnP2JyYW5jaD1tYXN0ZXIpXShodHRwczov\nL3RyYXZpcy1jaS5vcmcvc2hhcmVnYXRlL2NyYWNvKSBbIVtQUnMgV2VsY29t\nZV0oaHR0cHM6Ly9pbWcuc2hpZWxkcy5pby9iYWRnZS9QUnMtd2VsY29tZS1n\ncmVlbi5zdmcpXShodHRwczovL2dpdGh1Yi5jb20vc2hhcmVnYXRlL2NyYWNv\nL3B1bGxzKQoKKipDKipyZWF0ZSAqKlIqKmVhY3QgKipBKipwcCAqKkMqKm9u\nZmlndXJhdGlvbiAqKk8qKnZlcnJpZGUgaXMgYW4gZWFzeSBhbmQgY29tcHJl\naGVuc2libGUgY29uZmlndXJhdGlvbiBsYXllciBmb3IgY3JlYXRlLXJlYWN0\nLWFwcCB2Mi4KCkdldCBhbGwgdGhlIGJlbmVmaXRzIG9mIGNyZWF0ZS1yZWFj\ndC1hcHAgKiphbmQqKiBjdXN0b21pemF0aW9uIHdpdGhvdXQgdXNpbmcgJ2Vq\nZWN0JyBieSBhZGRpbmcgYSBzaW5nbGUgYGNyYWNvLmNvbmZpZy5qc2AgZmls\nZSBhdCB0aGUgcm9vdCBvZiB5b3VyIGFwcGxpY2F0aW9uIGFuZCBjdXN0b21p\nemUgeW91ciBlc2xpbnQsIGJhYmVsLCBwb3N0Y3NzIGNvbmZpZ3VyYXRpb25z\nIGFuZCBtYW55IG1vcmUuCgpBbGwgeW91IGhhdmUgdG8gZG8gaXMgY3JlYXRl\nIHlvdXIgYXBwIHVzaW5nIFtjcmVhdGUtcmVhY3QtYXBwXShodHRwczovL2dp\ndGh1Yi5jb20vZmFjZWJvb2svY3JlYXRlLXJlYWN0LWFwcC8pIGFuZCBjdXN0\nb21pemUgdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCBhIGBjcmFjby5jb25maWcu\nanNgIGZpbGUuCgotIFtJbnN0YWxsYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNv\nbS9zaGFyZWdhdGUvY3JhY28vYmxvYi9tYXN0ZXIvcGFja2FnZXMvY3JhY28v\nUkVBRE1FLm1kI2luc3RhbGxhdGlvbikgLSBIb3cgdG8gaW5zdGFsbCBhbmQg\nc2V0dXAgYGNyYWNvYC4KLSBbQ0xJIE9wdGlvbnNdKGh0dHBzOi8vZ2l0aHVi\nLmNvbS9zaGFyZWdhdGUvY3JhY28vYmxvYi9tYXN0ZXIvcGFja2FnZXMvY3Jh\nY28vUkVBRE1FLm1kI2NsaS1vcHRpb25zKSAtIEF2YWlsYWJsZSBDTEkgb3B0\naW9ucy4KLSBbQ29uZmlndXJhdGlvbiBPdmVydmlld10oaHR0cHM6Ly9naXRo\ndWIuY29tL3NoYXJlZ2F0ZS9jcmFjby9ibG9iL21hc3Rlci9wYWNrYWdlcy9j\ncmFjby9SRUFETUUubWQjY29uZmlndXJhdGlvbi1vdmVydmlldykgLSBRdWlj\na2x5IHNlZSBob3cgeW91IGNhbiBjb25maWd1cmUgeW91ciBDUkEgaW5zdGFs\nbGF0aW9uIHdpdGggdGhpcyBwbHVnaW4uCi0gW1JlY2lwZXNdKGh0dHBzOi8v\nZ2l0aHViLmNvbS9zaGFyZWdhdGUvY3JhY28vdHJlZS9tYXN0ZXIvcmVjaXBl\ncykg4oCTIFNob3J0IHJlY2lwZXMgZm9yIGNvbW1vbiB1c2UgY2FzZXMuCi0g\nW0RldmVsb3AgYSBQbHVnaW5dKGh0dHBzOi8vZ2l0aHViLmNvbS9zaGFyZWdh\ndGUvY3JhY28vYmxvYi9tYXN0ZXIvcGFja2FnZXMvY3JhY28vUkVBRE1FLm1k\nI2RldmVsb3AtYS1wbHVnaW4pIC0gSG93IHRvIGRldmVsb3AgYSBwbHVnaW4g\nZm9yIGBjcmFjb2AuCgojIyBDaGFuZ2Vsb2cKCk1ham9yIGNoYW5nZXMgYXJl\nIGF2YWlsYWJsZSBpbiB0aGUgW2NoYW5nZWxvZyBmb2xkZXJdKGh0dHBzOi8v\nZ2l0aHViLmNvbS9zaGFyZWdhdGUvY3JhY28vdHJlZS9tYXN0ZXIvY2hhbmdl\nbG9nKS4KCiMjIENvbW11bml0eSBNYWludGFpbmVkIFBsdWdpbnMKCiogW2Ny\nYWNvLXByZWFjdF0oaHR0cHM6Ly9naXRodWIuY29tL0Zvcm1BUEkvY3JhY28t\ncHJlYWN0KSBieSBbQEZvcm1BUEldKGh0dHBzOi8vZ2l0aHViLmNvbS9Gb3Jt\nQVBJKQoqIFtjcmFjby1sZXNzXShodHRwczovL2dpdGh1Yi5jb20vRm9ybUFQ\nSS9jcmFjby1sZXNzKSBieSBbQEZvcm1BUEldKGh0dHBzOi8vZ2l0aHViLmNv\nbS9Gb3JtQVBJKQoqIFtjcmFjby1hbnRkXShodHRwczovL2dpdGh1Yi5jb20v\nRm9ybUFQSS9jcmFjby1hbnRkKSBieSBbQEZvcm1BUEldKGh0dHBzOi8vZ2l0\naHViLmNvbS9Gb3JtQVBJKQoqIFtjcmFjby1wbHVnaW4tcmVhY3QtaG90LXJl\nbG9hZF0oaHR0cHM6Ly9naXRodWIuY29tL0hhc2FuQXlhbi9jcmFjby1wbHVn\naW4tcmVhY3QtaG90LXJlbG9hZCkgYnkgW0BIYXNhbkF5YW5dKGh0dHBzOi8v\nZ2l0aHViLmNvbS9IYXNhbkF5YW4pCiogW2NyYWNvLWJhYmVsLWxvYWRlcl0o\naHR0cHM6Ly9naXRodWIuY29tL3JqZXJ1ZS9jcmFjby1iYWJlbC1sb2FkZXIp\nIGJ5IFtAcmplcnVlXShodHRwczovL2dpdGh1Yi5jb20vcmplcnVlLykKKiBb\nY3JhY28tcmF3LWxvYWRlcl0oaHR0cHM6Ly9naXRodWIuY29tL21lbE1hc3Mv\nY3JhY28tcmF3LWxvYWRlcikgYnkgW0BtZWxNYXNzXShodHRwczovL2dpdGh1\nYi5jb20vbWVsTWFzcykKKiBbY3JhY28tYmFzZTY0LWlubGluZS1sb2FkZXJd\nKGh0dHBzOi8vZ2l0aHViLmNvbS9tZWxNYXNzL2NyYWNvLWJhc2U2NC1pbmxp\nbmUtbG9hZGVyKSBieSBbQG1lbE1hc3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9t\nZWxNYXNzKQoqIFtjcmFjby13b3JrYm94XShodHRwczovL2dpdGh1Yi5jb20v\na2V2aW5zcGVycmluZS9jcmFjby13b3JrYm94KSBieSBbQGtldmluc3BlcnJp\nbmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9rZXZpbnNwZXJyaW5lKQoqIFtjcmFj\nby11c2UtYmFiZWxyY10oaHR0cHM6Ly9naXRodWIuY29tL2phY2t3aWxzZG9u\nL2NyYWNvLXVzZS1iYWJlbHJjKSBieSBbQGphY2t3aWxzZG9uXShodHRwczov\nL2dpdGh1Yi5jb20vamFja3dpbHNkb24pCgojIyBBY2tub3dsZWRnZW1lbnRz\nCgpbQHRpbWFybmV5XShodHRwczovL2dpdGh1Yi5jb20vdGltYXJuZXkpIGZv\nciBoYXZpbmcgY3JlYXRlZCBbcmVhY3QtYXBwLXJld2lyZWRdKGh0dHBzOi8v\nZ2l0aHViLmNvbS90aW1hcm5leS9yZWFjdC1hcHAtcmV3aXJlZCkuCgojIyBM\naWNlbnNlCgpDb3B5cmlnaHQgwqkgMjAxOSwgR3JvdXBlIFNoYXJlZ2F0ZSBp\nbmMuIFRoaXMgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExp\nY2Vuc2UsIFZlcnNpb24gMi4wLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2Yg\ndGhpcyBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9zaGFyZWdhdGUv\nY3JhY28vYmxvYi9tYXN0ZXIvTElDRU5TRS4K\n") });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Markdown style={styles.container}>{this.state.readme}</Markdown>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    marginBottom: scaleSize(10),
    marginTop: scaleSize(10),
    borderWidth: scaleSize(1),
    borderColor: "black"
  }
});
