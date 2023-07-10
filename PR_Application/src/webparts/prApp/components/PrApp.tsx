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
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FieldPicker } from "@pnp/spfx-controls-react/lib/FieldPicker";
export default class PrApp extends React.Component<IPrAppProps, IPrAppState, {}> {

  private _sp: SPFI;

  public constructor(props) {
    super(props);
    this.state = { ListItems: [] };
    this.context = this.props.context;
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

  private onSelectedItem(items: []) {
    console.log("selected items:", items);
  }
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
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
          
          <h1>ComboBox</h1>
          <ComboBoxListItemPicker listId='Cities'
            columnInternalName='Title'
            orderBy='Title asc'
            keyColumnInternalName='Id'
            onSelectedItem={this.onSelectedItem}
            webUrl={this.props.context.pageContext.web.absoluteUrl}
            spHttpClient={this.props.context.spHttpClient as any} />
            <h1>
People Picker
            </h1>
            <PeoplePicker
            context={this.props.context as any}
            titleText="People Picker"
            personSelectionLimit={3}
            showtooltip={true}
            required={true}
            disabled={false}
            onChange={this._getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />
          <h1>Accordian</h1>
          {
            this.state.ListItems.map((item, index) => (
              <Accordion title={item.Title} defaultCollapsed={true} className={"itemCell"} key={index}>
                <div className={"itemContent"}>
                  <div className={"itemResponse"}>{item.Title}</div>
                  <div className={"itemIndex"}>{`Langue :  ${item.Country}`}</div>
                </div>
              </Accordion>
            ))
          }

          
        </div>
      </section>
    );
  }
}
