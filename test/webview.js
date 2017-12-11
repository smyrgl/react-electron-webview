import React from 'react';
import { findDOMNode } from 'react-dom';

import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-dom/test-utils'

import expect, { spyOn } from 'expect';

import WebView from '../src/webview';

describe('webview', () => {
  function renderWebviewTag(props) {
    const webview = renderIntoDocument(<WebView {...props} />);
    return findRenderedDOMComponentWithTag(webview, 'webview');
  }

  describe('props', () => {
    it('sets the src prop on the webview element', () => {
      const url = 'http://www.google.com';
      const webview = renderWebviewTag({src: url});
      expect(webview.getAttribute('src')).toEqual(url);
    });
  });

  describe('events', () => {
    it('responds to the load-commit event', () => {
      const props = {onLoadCommit: () => true};
      const spy = spyOn(props, 'onLoadCommit');
      const webview = renderWebviewTag(props);

      const testEvent = new Event('load-commit');
      webview.dispatchEvent(testEvent);
      expect(spy).toHaveBeenCalled();
    });

    it('responds to the dom-ready event', () => {
      const props = {onDomReady: () => true};
      const spy = spyOn(props, 'onDomReady');
      const webview = renderWebviewTag(props);

      const testEvent = new Event('dom-ready');
      webview.dispatchEvent(testEvent);
      expect(spy).toHaveBeenCalled();
    });
  });
});
