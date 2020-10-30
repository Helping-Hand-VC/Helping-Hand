import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clean-up',
  templateUrl: './clean-up.component.html',
  styleUrls: ['./clean-up.component.css']
})
export class CleanUpComponent implements OnInit {

  public Points = 0;
  public GoodHearts = 3;
  public LostHearts = 0;

  public OptionA = "OptionA";
  public OptionB = "OptionB";

  public RoomImageOptionA = "Dinning room.svg";
  public RoomImageOptionB = "Bathroom .svg";
  public RoomItem = "Bathroom/bath.png";

  public iCurrent = 0;


  public Options = [
    {
      Correct: "Bathroom .svg",
      Incorrect: "Dinning room.svg",
      Item: "Bathroom/bath.png",
      OptionA : "Dinning room",
      OptionB : "Bathroom"
    },
    {
      Correct: "Bedroom.svg",
      Incorrect: "Playing .svg",
      Item: "Bedroom/bed.png",
      OptionA : "Outside",
      OptionB : "Bedroom"
    },
    {
      Correct: "Bathroom .svg",
      Incorrect: "Dinning room.svg",
      Item: "Bathroom/toilet.png",
      OptionA : "Dinning room",
      OptionB : "Bathroom"
    },
    {
      Correct: "Kitchen.svg",
      Incorrect: "Bathroom .svg",
      Item: "Kitchen/bigpot.png",
      OptionA : "Bathroom",
      OptionB : "Kitchen"
    }

  ];
  


  constructor() { }

  ngOnInit(): void {
  }

  OptionAClick(){
    this.iCurrent++;
    //InCorrect
    alert("Sorry that was incorrect");
    this.LostHearts++;
    this.GoodHearts--;

    if(this.GoodHearts == 0){
      alert("Your score is: " + this.Points);

      this.iCurrent   = 0;
      this.LostHearts = 0;
      this.GoodHearts = 3;
      this.iCurrent   = 0;
      this.Points     = 0;
    }
  }

  OptionBClick(){
    this.iCurrent++;
    //Correct
    alert("Well DONE!!!");
    this.Points++;
  }

}
