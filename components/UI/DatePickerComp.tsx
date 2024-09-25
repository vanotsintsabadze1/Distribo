import { DatePicker, DatePickerValueChangeDetails, Portal } from "@ark-ui/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import ErrorMessage from "./ErrorMessage";

interface DatePickerCompProps {
  setDeadlineDate: (date: Date | null) => void;
  errorMessage: string | null;
  setErrorMessage: (error: string | null) => void;
}

export default function DatePickerComp({ setDeadlineDate, errorMessage, setErrorMessage }: DatePickerCompProps) {
  const today = new Date();

  const handleDateChange = (date: any) => {
    if (date?.valueAsString) {
      const dateString = date.valueAsString[0];
      const selected = new Date(dateString);

      setErrorMessage(null);

      if (selected <= today) {
        setErrorMessage("Please select a deadline date in the future.");
        setDeadlineDate(null);
      } else {
        setDeadlineDate(selected);
      }
    }
  };

  return (
    <DatePicker.Root
      timeZone="UTC"
      onValueChange={(details: DatePickerValueChangeDetails) => handleDateChange(details)}
    >
      <DatePicker.Label className="text-sm font-semibold">Choose order delivery deadline</DatePicker.Label>
      <DatePicker.Control className="mt-1.5 flex items-center gap-2">
        <DatePicker.Input className="rounded-md border border-gray-300 p-2" />
        <DatePicker.Trigger>
          <Calendar size={25} />
        </DatePicker.Trigger>
      </DatePicker.Control>
      <div className="mt-2">{errorMessage && <ErrorMessage error={errorMessage} />}</div>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className="data-[scope=date-picker]:data-[part=content]:data-[state=open]:animate-fadeIn data-[scope=date-picker]:data-[part=content]:data-[state=closed]:animate-fadeOut rounded-md bg-tertiary p-2">
            <div className="flex items-center justify-between gap-2">
              <DatePicker.YearSelect className="rounded-md p-1" />
              <DatePicker.MonthSelect className="rounded-md p-1" />
            </div>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="flex items-center justify-between">
                      <DatePicker.PrevTrigger>
                        <ChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>
                        <ChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="w-full">
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {datePicker.weekDays.map((weekDay, id) => (
                            <DatePicker.TableHeader key={id}>{weekDay.short.slice(0, 1)}</DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {datePicker.weeks.map((week, id) => (
                          <DatePicker.TableRow key={id}>
                            {week.map((day, id) => (
                              <DatePicker.TableCell key={id} value={day}>
                                <DatePicker.TableCellTrigger className="flex items-center justify-center">
                                  {day.day}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="flex items-center justify-between">
                      <DatePicker.PrevTrigger>
                        <ChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>
                        <ChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="w-full">
                      <DatePicker.TableBody>
                        {datePicker.getMonthsGrid({ columns: 4, format: "short" }).map((months, id) => (
                          <DatePicker.TableRow key={id}>
                            {months.map((month, id) => (
                              <DatePicker.TableCell key={id} value={month.value}>
                                <DatePicker.TableCellTrigger className="flex items-center justify-center">
                                  {month.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="flex items-center justify-between">
                      <DatePicker.PrevTrigger>
                        <ChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>
                        <ChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="w-full">
                      <DatePicker.TableBody>
                        {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                          <DatePicker.TableRow key={id}>
                            {years.map((year, id) => (
                              <DatePicker.TableCell key={id} value={year.value}>
                                <DatePicker.TableCellTrigger className="flex items-center justify-center">
                                  {year.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  );
}
