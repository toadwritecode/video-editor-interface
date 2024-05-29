import {client} from "@/api/client.js";
import store from "@/store/index.js";

class AudioService{
  getNotesSegment() {
            return client.get(`/video/notes_segment/f817b2ce-17db-4dcc-84bb-2f042e93dffc`,
                { headers: {Authorization: `Bearer ${store.getters.getAccessToken}`}})
                .then(response => response.data)
  }
}

export default new AudioService();

export const data = {
  datasets: [
    {
      label: 'Эталонный вокал',
      backgroundColor: '#7C8CF8',
      data: [
        {
          x: 20,
          y: 25,
          r: 10
        },
        {
          x: 40,
          y: 10,
          r: 10
        },
        {
          x: 30,
          y: 22,
          r: 10
        }
      ]
    },
    {
      label: 'Собственный вокал',
      backgroundColor: '#f87979',
      data: [
        {
          x: 10,
          y: 30,
          r: 10
        },
        {
          x: 20,
          y: 20,
          r: 10
        },
        {
          x: 15,
          y: 8,
          r: 10
        }
      ]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: true
}