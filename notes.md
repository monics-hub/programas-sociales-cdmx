# Notes for Programas-Sociales-CDMX project

## CSV Data
* The csv file is all in spanish
* Column names should not contain latin characters like ñ (replaced by gn)
* Column names should not contain spaces (replaced by _)
* Content will contain latin characters and spaces encoded as UTF-8
* The columns should be:
  - Date in date format
  - Long date in text format
  - The year in number format
  - Section in text format
  - Title (program name) in text format
  - Subtitle in text format
  - Description in text format
  - Budget in integer/currency format
  - Number of beneficiaries in integer format
  - Link to the pdf of the program


## HTML Content
* The user should be able to select the program based in:
  - The entity name
  - The year
  - The section / topic
  - The name / title

* There should be display the following elements once the user have chosen:
  - The date
  - The program title
  - The program subtitle
  - The program description
  - Cards for statistics including
    + Budget
    + Number of beneficiaries (Impact)
  - Tableau bar charts for comparing
    + Budget
    + Number of beneficiaries (Impact)
  - Button for downloading the pdf file

* The default selected program should be the last one comming from Venustiano Carranza.


## CSS Styling
* There should be CSS variables to control the colors as well as the dimentions.
* The colors should be in a gray scale expect for the brand theme which should be the red (Morena) tone.
* Cards will follow the Power BI design.
* The layout will be divided in floating elements.
* Each floating element will have 16px of rounded corners.


## JavaScript Behaviour
* Data sould be read from a csv file using PapaParse.
* Menus should update and change automatically without the need for search and clear buttons.
* There should be accesibility features for visual impaired people.