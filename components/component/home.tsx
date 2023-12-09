/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/itejEnFr3kY
 */
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadButton } from "./upload-button"

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <Tabs className="max-w-lg mx-auto mt-8" defaultValue="home">
        {/* <TabsList className="flex justify-start space-x-4">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList> */}
        <TabsContent value="home">
          <Card className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 font-bold text-center">TOM Patcher</CardTitle>
            </CardHeader>
            <CardContent className="mt-4 text-center">
              <p className="text-gray-600">
                This is the home page of our minimal website. Explore other pages by clicking on the tabs.
              </p>
            </CardContent>
            <CardFooter className="mt-4 flex justify-center">
              <UploadButton />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="about">
          <Card className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 font-bold text-center">About Us</CardTitle>
            </CardHeader>
            <CardContent className="mt-4 text-center">
              <p className="text-gray-600">
                We are a simple, minimal website. Our goal is to provide the best user experience.
              </p>
            </CardContent>
            <CardFooter className="mt-4 flex justify-center">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 font-bold text-center">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="mt-4 text-center">
              <p className="text-gray-600">We'd love to hear from you. Click the button below to get in touch.</p>
            </CardContent>
            <CardFooter className="mt-4 flex justify-center">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Get in Touch
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
