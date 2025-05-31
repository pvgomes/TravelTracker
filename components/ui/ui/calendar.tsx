import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format, getYear, getMonth, addMonths, addYears, setMonth, setYear } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [date, setDate] = React.useState<Date>(props.defaultMonth || new Date())
  const [isYearPickerOpen, setIsYearPickerOpen] = React.useState(false)
  
  // Update our state when props change
  React.useEffect(() => {
    if (props.month) {
      setDate(props.month)
    }
  }, [props.month])

  // Create a range of years
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 50
  const endYear = currentYear + 10
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
  
  // Navigate by month and year
  const handlePrevMonth = () => {
    const newDate = addMonths(date, -1)
    setDate(newDate)
    props.onMonthChange?.(newDate)
  }
  
  const handleNextMonth = () => {
    const newDate = addMonths(date, 1)
    setDate(newDate)
    props.onMonthChange?.(newDate)
  }
  
  const handlePrevYear = () => {
    const newDate = addYears(date, -1)
    setDate(newDate)
    props.onMonthChange?.(newDate)
  }
  
  const handleNextYear = () => {
    const newDate = addYears(date, 1)
    setDate(newDate)
    props.onMonthChange?.(newDate)
  }
  
  const handleYearSelect = (year: string) => {
    const newDate = setYear(date, parseInt(year))
    setDate(newDate)
    props.onMonthChange?.(newDate)
    setIsYearPickerOpen(false)
  }
  
  const handleMonthSelect = (monthIndex: number) => {
    const newDate = setMonth(date, monthIndex)
    setDate(newDate)
    props.onMonthChange?.(newDate)
  }
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  // Custom header with year picker
  const CustomCaption = () => {
    return (
      <div className="flex items-center justify-between px-1 py-2">
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent p-0 mr-1 opacity-50 hover:opacity-100"
            onClick={handlePrevYear}
            title="Previous Year"
          >
            <span className="sr-only">Previous Year</span>
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="h-4 w-4 -ml-2" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            onClick={handlePrevMonth}
            title="Previous Month"
          >
            <span className="sr-only">Previous Month</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Select 
            value={String(getMonth(date))} 
            onValueChange={(value) => handleMonthSelect(parseInt(value))}
          >
            <SelectTrigger className="h-8 pr-1 focus:ring-0">
              <SelectValue>{monthNames[getMonth(date)]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((month, index) => (
                <SelectItem key={month} value={String(index)}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover open={isYearPickerOpen} onOpenChange={setIsYearPickerOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="h-8 pl-2 pr-1 font-normal"
                onClick={() => setIsYearPickerOpen(true)}
              >
                {getYear(date)}
                <ChevronRight className="h-4 w-4 opacity-50 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-0" align="start">
              <div className="h-60 overflow-y-auto">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={year === getYear(date) ? "default" : "ghost"}
                      className="h-8"
                      onClick={() => handleYearSelect(year.toString())}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            onClick={handleNextMonth}
            title="Next Month"
          >
            <span className="sr-only">Next Month</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent p-0 ml-1 opacity-50 hover:opacity-100"
            onClick={handleNextYear}
            title="Next Year"
          >
            <span className="sr-only">Next Year</span>
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 -ml-2" />
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={date}
      onMonthChange={setDate}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "hidden",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
