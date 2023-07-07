import * as React from 'react';
import styles from './PrApp.module.scss';
import { IPrAppProps } from './IPrAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPrAppState } from './IPrAppState';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { SPFI, spfi } from '@pnp/sp';
import { getSP } from './pnpjsConfig';

export default class PrApp extends React.Component<IPrAppProps,IPrAppState, {}> {

  private _sp: SPFI;

  public constructor(props) {
    super(props);
    this.state = { ListItems: [] };
    this._sp = getSP();
  }

  private async GetItems() {
    try {
      debugger;
      const spCache = spfi(this._sp);
      const response: any[] = await spCache.web.lists
        .getByTitle("Cities")
        .items
        .select("Title", "Country")();
      console.log(response);
      this.setState({ ListItems: response });

    } catch (error) {
      console.log("Error in GetItem : " + error);
    }
  }


  public componentDidMount(): void {
    this.GetItems();

  }

  public render(): React.ReactElement<IPrAppProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.prApp} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          
        </div>
      </section>
    );
  }
}
