import {client} from "@/api/client.js";
import store from "@/store/index.js";

class AudioService {



  getNotesSegment() {
            // return client.get(`/video/notes_segment/f817b2ce-17db-4dcc-84bb-2f042e93dffc`,
            //     { headers: {Authorization: `Bearer ${store.getters.getAccessToken}`}})
            //     .then(response => response.data)

    return new Promise((resolve, reject) => {
      resolve(
  [
          {
            note: 'AM',
            frequency: 425.68,
            start: 0.25,
            end: 4.69
          },
          {
            note: 'BM',
            frequency: 268.44,
            start: 6.24,
            end: 8.42
          },
          {
            note: 'AM',
            frequency: 425.68,
            start: 10.11,
            end: 14.56
          },
          {
            note: 'CM',
            frequency: 125.68,
            start: 15.28,
            end: 18.47
          }
        ]
      );
    });
  }

}

export default new AudioService();