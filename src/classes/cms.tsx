import * as React from "react";

import firebase from "./firebase";

/**
 * Cms is a class to grab and build JSX from firebase.
 * It holds the content and a directions object that specifies what type / how to handle each content object.
 */
export class Cms {
  public contentMap: Map<string, any> = new Map();

  private firestore: any = firebase.firestore();
  private pageId: string;
  // This value is changed for each project. It is the websiteId in firebase
  private siteId: string = "richard";
  private eventMap: Map<string, any> = new Map();

  /**
   *
   * @param pageId String that denotes the page in the server
   */
  constructor(pageId: string) {
    // Set initial firebase settings
    this.firestore.settings({
      timestampsInSnapshots: true
    });
    this.pageId = pageId;

    // Check if the data exists locally or fetch it via firebase
    window.localStorage.getItem(`${this.siteId}-${this.pageId}`)
      ? this.getDataLocally()
      : this.initFirebaseFetch();
  }

  /**
   *
   * @param event Event string. 'update'
   * @param callback Function that is called when event is emitted. 'update' (contentMap)
   */
  public on(event: string, callback: any) {
    let array;
    if (!this.eventMap.get(event)) {
      array = [];
    } else {
      array = this.eventMap.get(event);
    }

    array.push(callback);
    this.eventMap.set(event, array);
  }

  public getRaw(): any {
    return JSON.parse(window.localStorage.getItem(
      `${this.siteId}-${this.pageId}`
    ) as string);
  }

  /**
   *
   * @param event Event string. 'update'
   */
  private emit(event: string) {
    const array = this.eventMap.get(event);
    if (array) {
      array.forEach((callback: any) => {
        callback(this.contentMap);
      });
    }
  }

  /**
   * Inits firebase with correct settings and makes the initial call to get content.
   * This function should only fire when the page is exactly fresh.
   */
  private initFirebaseFetch(): void {
    // Need to check if user is online or not
    if (window.navigator.onLine) {
      console.log("No local data for this page, getting from firebase.");

      // Get the data for the pageId
      this.firestore
        .collection("websites")
        .doc(this.siteId)
        .collection("pages")
        .doc(this.pageId)
        .get()
        .then((data: any) => {
          const firebaseData = data.data();
          this.createContent(firebaseData);
          this.emit("update");

          // Save it locally
          window.localStorage.setItem(
            `${this.siteId}-${this.pageId}`,
            JSON.stringify(firebaseData)
          );
        });
    } else {
      console.log("Unable to get content, user is offline");
    }
  }

  /**
   * Pass the firebaseData to this function to populate the contentMap
   * @param firebaseData The data object including directions
   */
  private createContent(firebaseData: any): void {
    // Loop through the directions for the page
    const keys = Object.keys(firebaseData.directions);
    keys.forEach(key => {
      const content = this.switchGenerateJSX(
        firebaseData.directions[key],
        firebaseData[key]
      );
      if (this.contentMap.get(key)) {
        const currentData = this.contentMap.get(key);
        if (currentData !== content) {
          this.contentMap.set(key, content);
        }
      } else {
        this.contentMap.set(key, content);
      }
    });
  }

  /**
   * Gets the data from localStorage
   */
  private getDataLocally(): void {
    const firebaseData = JSON.parse(window.localStorage.getItem(
      `${this.siteId}-${this.pageId}`
    ) as string);
    this.createContent(firebaseData);

    setTimeout(() => {
      this.emit("update");
      this.refreshContentFromServer();
    });
  }

  /**
   * Refreshes the local content with what's on the server. Only updates if it's different
   */
  private refreshContentFromServer(): void {
    // Check to make sure user is online
    if (window.navigator.onLine) {
      this.firestore
        .collection("websites")
        .doc(this.siteId)
        .collection("pages")
        .doc(this.pageId)
        .get()
        .then((data: any) => {
          const firebaseData = data.data();
          this.createContent(firebaseData);
          this.emit("update");
          // Save it locally
          window.localStorage.setItem(
            `${this.siteId}-${this.pageId}`,
            JSON.stringify(firebaseData)
          );
        });
    } else {
      console.log("Unable to update content, user is offline");
    }
  }

  /**
   *
   * @param directions Directions object data param from firebase
   * @param data Content data from firebase
   */
  private switchGenerateJSX(directions: any, data: any): any {
    switch (directions.type) {
      case "pArray":
        return (
          <div>
            {data.map((item: string, index: number) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        );

      case "boldedList":
        return (
          <div>
            {data.map((item: any, index: number) => {
              return (
                <p key={index}>
                  <b>{item.title}</b> {item.text}
                </p>
              );
            })}
          </div>
        );

      case "poem":
        return (
          <div>
            {data.map((item: any, index: number) => {
              return (
                <p key={index}>
                  <div id={item.title} />
                  <b>{item.title}</b>
                  <br />
                  {item.text.map((text: string, textIndex: number) => {
                    if (text !== "break") {
                      return (
                        <p className="poem-text" key={index + "-" + textIndex}>
                          {text}
                        </p>
                      );
                    } else {
                      return <br />;
                    }
                  })}
                  <div className="divider" />
                </p>
              );
            })}
          </div>
        );

      default:
        return <p>Directions lack propery information</p>;
    }
  }
}
