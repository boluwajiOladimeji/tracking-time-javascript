'use strict';

console.log('bolu');

const weeklyBtn = document.querySelector('.weekly');
const monthlyBtn = document.querySelector('.monthly');
const dailyBtn = document.querySelector('.daily');
const allBtns = document.querySelectorAll('.btn');
const periodContainer = document.querySelector('.period-container');

const fetchData = async () => {
  const response = await fetch('./data.json');
  const data = await response.json();
  return data;
};

const displayPeriod = (data, period, duration) => {
  periodContainer.innerHTML = data
    .map((item) => {
      const { title, img } = item;
      const time = item.timeframes[period];
      return ` <article class="card">
            <div class="top-card ${
              title === 'Self Care' ? 'Self-care' : title
            }">
              <img src="${img}" alt="${title} icon" class="icon"  />
            </div>
            <div class="bottom-card">
              <div class="title-container">
                <p class="title">${title}</p>
                <img src="./images/icon-ellipsis.svg" alt="" />
              </div>
              <div class="duration">
                <p class="current">${
                  time.current <= 1 ? time.current + 'hr' : time.current + 'hrs'
                }</p>
                <p class="past">${
                  duration === 'day' ? 'Yesterday' : 'last ' + duration
                } -  ${
        time.previous <= 1 ? time.previous + 'hr' : time.previous + 'hrs'
      }</p>
              </div>
            </div>
          </article>`;
    })
    .join('');
};

const showdata = async () => {
  const data = await fetchData();
  //   console.log(data);
  displayPeriod(data, 'weekly', 'week');

  weeklyBtn.addEventListener('click', () => {
    displayPeriod(data, 'weekly', 'week');
  });

  dailyBtn.addEventListener('click', () => {
    displayPeriod(data, 'daily', 'day');
  });

  monthlyBtn.addEventListener('click', () => {
    displayPeriod(data, 'monthly', 'month');
  });
};

function addActive() {
  allBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      allBtns.forEach((btn) => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  });
}

addActive();

window.addEventListener('DOMContentLoaded', () => {
  showdata();
});
